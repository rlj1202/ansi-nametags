import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import fs from "fs";

import * as csv from "csv";
import path from "path";

import HomecomingNametag from "../components/HomecomingNametag";

export const getServerSideProps: GetServerSideProps<{
  persons: { title: string; subtitle: string; group: string }[];
}> = async (context) => {
  const filePath = path.join(
    process.cwd(),
    "res/2022_homecoming_participants.csv",
  );
  const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });

  const csvStream = fileStream.pipe(
    csv.parse({ encoding: "utf8", columns: true }),
  );

  const persons: Array<{ title: string; subtitle: string; group: string }> = [];

  for await (const chunk of csvStream) {
    const { 이름: name, 학번: id, 분류: group } = chunk;

    if (group === "교수님") {
      persons.push({
        title: name,
        subtitle: "교수님",
        group: group,
      });
    } else {
      persons.push({
        title: name,
        subtitle: `${id} 학번`,
        group: group,
      });
    }
  }

  const padding = Math.ceil(persons.length / 8) * 8 - persons.length;

  for (let i = 0; i < padding; i++) {
    persons.push({
      title: "",
      subtitle: "",
      group: "",
    });
  }

  return {
    props: {
      persons,
    },
  };
};

const HomecomingNametags: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ persons }) => {
  return (
    <div className="wrapper">
      {persons.map((person, index) => (
        <div className="nametag" key={index}>
          <HomecomingNametag
            group={person.group}
            title={person.title}
            subtitle={person.subtitle}
            homecomingYear={2022}
          />
        </div>
      ))}

      <style jsx>{`
        .nametag {
          float: left;
          padding-right: 0pt;
          padding-bottom: 0pt;
        }

        .nametag:nth-child(2n + 1) {
          clear: left;
        }
      `}</style>
    </div>
  );
};

export default HomecomingNametags;
