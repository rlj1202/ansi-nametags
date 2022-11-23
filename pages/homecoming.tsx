import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Image from "next/image";
import { FC } from "react";

import ansiLogo from "../public/ansi-logo-white.svg";

import fs from "fs";

import * as csv from "csv";
import path from "path";

const HomecomingNametag: FC<{
  group: string;
  title: string;
  subtitle: string;
  homecomingYear: number;
  ext?: string;
}> = ({ group, title, subtitle, homecomingYear, ext }) => {
  const width = "8.5cm";
  const height = "5.4cm";

  return (
    <div className="wrapper">
      <div className="info">
        <div className="info-year">{subtitle}</div>
        <div className="info-name">{title}</div>
        {ext && <div className="info-ext">{ext}</div>}
      </div>
      <div className="footer">
        <div className="footer-logo">
          <div className="footer-logo-wrapper">
            <Image src={ansiLogo} alt="A.N.S.I. Logo" fill />
          </div>
        </div>
        <div className="footer-names">
          <div className="footer-hangul">
            {homecomingYear} A.N.S.I. 홈커밍데이
          </div>
          <div className="footer-english">
            A.N.S.I. Homecoming Day {homecomingYear}
          </div>
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          border: 1px solid black;

          width: ${width};
          height: ${height};

          display: flex;
          flex-direction: column;

          overflow: hidden;

          font-family: "Nanum Gothic", sans-serif;
        }

        .info {
          color: black;
          text-align: center;

          flex-grow: 1;

          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .info-year {
          font-size: 20pt;
          font-weight: 800;
        }
        .info-name {
          font-size: 60pt;
          font-weight: bold;
          font-weight: 800;
        }
        .info-ext {
          font-size: 24pt;
        }

        .footer {
          text-align: right;
          background-color: var(
            ${group === "재학생"
              ? "--ansi-black"
              : group === "휴학생"
              ? "--ansi-blue"
              : group === "졸업생"
              ? "--ansi-red"
              : group === "신입생"
              ? "--ansi-mint"
              : group === "교수님"
              ? "--ansi-brown"
              : "--ansi-black"}
          );
          color: white;

          padding: 5pt;
          box-sizing: border-box;

          display: flex;
          align-items: stretch;
        }
        .footer-logo {
          padding-left: 5pt;
          padding-right: 25pt;
          flex: 1;
        }
        .footer-logo-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .footer-hangul,
        .footer-english {
          padding: 1pt;
        }
        .footer-hangul {
          font-weight: bold;
          font-size: 10pt;

          grid-column-start: 2;
        }
        .footer-english {
          font-size: 10pt;

          grid-column-start: 2;
        }
      `}</style>
    </div>
  );
};

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
