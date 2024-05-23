import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { FC, useEffect, useRef } from "react";

import fs from "fs";

import * as csv from "csv";
import path from "path";

const ApcNametag: FC<{
  title: string;
  subtitle: string;
  year: number;
}> = ({ title, subtitle, year }) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const fontSize = window
      .getComputedStyle(titleRef.current, null)
      .getPropertyValue("font-size");

    const fontSizeNum = parseInt(fontSize.match(/\d+/)?.at(0) || "1");

    const padding = 15;
    const maxFontSize = 90;

    const width = titleRef.current.clientWidth;
    const parentWidth =
      (titleRef.current.parentElement?.clientWidth || 1) - padding * 2;

    let adjustedFontSize = (fontSizeNum / width) * parentWidth;
    adjustedFontSize = Math.min(adjustedFontSize, maxFontSize);

    titleRef.current.style.fontSize = `${adjustedFontSize}px`;
  });

  useEffect(() => {
    if (!subtitleRef.current) return;

    const fontSize = window
      .getComputedStyle(subtitleRef.current, null)
      .getPropertyValue("font-size");

    const fontSizeNum = parseInt(fontSize.match(/\d+/)?.at(0) || "1");

    const padding = 15;
    const maxFontSize = 30;

    const width = subtitleRef.current.clientWidth;
    const parentWidth =
      (subtitleRef.current.parentElement?.clientWidth || 1) - padding * 2;

    let adjustedFontSize = (fontSizeNum / width) * parentWidth;
    adjustedFontSize = Math.min(adjustedFontSize, maxFontSize);

    subtitleRef.current.style.fontSize = `${adjustedFontSize}px`;
  });

  return (
    <div className="wrapper">
      <div className="info">
        <div ref={titleRef} className="info-title">
          {title}
        </div>
        <div ref={subtitleRef} className="info-subtitle">
          {subtitle}
        </div>
      </div>
      <div className="footer">
        <div className="footer-year">{year} APC</div>
        <div>제 14회 아주대학교 프로그래밍 경시대회</div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 9cm;
          height: 6cm;

          border: 1px solid black;

          display: flex;
          flex-direction: column;
        }

        .info {
          flex: 1;

          display: flex;
          flex-direction: column;

          justify-content: center;
          align-items: center;
        }
        .info-title {
          font-size: 45pt;
          font-weight: bold;
          font-family: "Impact";
          ${title == "STAFF" ? "color: rgb(187, 39, 26)" : ""}
          ${title == "DIRECTOR" ? "color: rgb(36, 42, 52)" : ""}
          ${title == "SETTER" ? "color: rgb(107, 34, 70)" : ""}
          ${title == "SYSTEM" ? "color: rgb(38, 78, 90)" : ""}
        }
        .info-subtitle {
          font-size: 26pt;
          font-weight: bold;
          color: rgb(67, 67, 67);
        }

        .footer {
          padding: 5pt;
          text-align: right;
          background-color: rgb(58, 56, 56);
          color: white;
        }
        .footer-year {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  persons: { title: string; subtitle: string }[];
}> = async (context) => {
  const filePath = path.join(process.cwd(), "res/2022_apc_participants.csv");
  const fileStream = fs.createReadStream(filePath, { encoding: "utf8" });

  const csvStream = fileStream.pipe(
    csv.parse({ encoding: "utf8", columns: true }),
  );

  const persons: Array<{ title: string; subtitle: string }> = [];

  for await (const chunk of csvStream) {
    const {
      이름: name,
      학번: id,
      학과: department,
      "참가 부문": division,
    } = chunk;
    persons.push({
      title: name,
      subtitle: `${department}, ${division}`,
    });
  }

  const padding = Math.ceil(persons.length / 8) * 8 - persons.length;

  for (let i = 0; i < padding; i++) {
    persons.push({
      title: "",
      subtitle: "",
    });
  }

  return {
    props: {
      persons,
    },
  };
};

const ApcNametags: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ persons }) => {
  const year = 2024;

  const staffs = [
    {
      title: "DIRECTOR",
      subtitle: "소프트웨어학과 심지수",
    },
    {
      title: "SETTER",
      subtitle: "소프트웨어학과 정의찬",
    },
    {
      title: "SETTER",
      subtitle: "소프트웨어학과 송선우",
    },
    {
      title: "SETTER",
      subtitle: "소프트웨어학과, 김현빈",
    },
    {
      title: "PROFESSOR",
      subtitle: "소프트웨어학과, 오상윤",
    },
    {
      title: "STAFF",
      subtitle: "소프트웨어학과 정진원",
    },
    {
      title: "STAFF",
      subtitle: "소프트웨어학과 전다함",
    },
    {
      title: "STAFF",
      subtitle: "소프트웨어학과 최환희",
    },
    {
      title: "STAFF",
      subtitle: "소프트웨어학과 신준화",
    },
    {
      title: "STAFF",
      subtitle: "소프트웨어학과 박지호",
    },
    {
      title: "SYSTEM",
      subtitle: "소프트웨어학과 홍길동",
    },
    {
      title: "홍길동",
      subtitle: "소프트웨어학과, Div1",
    },
    {
      title: "김철수",
      subtitle: "소프트웨어학과, Div2",
    },
  ];

  return (
    <div className="wrapper">
      {persons.map((person) => {
        return (
          <div className="nametag" key={`${person.title}${person.subtitle}`}>
            <ApcNametag
              title={person.title}
              subtitle={person.subtitle}
              year={year}
            />
          </div>
        );
      })}

      <style jsx>{`
        .wrapper {
          /*
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 3pt;

          page-break-inside: avoid;
          */
        }

        .nametag {
          /*
          page-break-inside: avoid;
          display: inline-block;
          page-break-inside: avoid;
          */
        }

        .nametag {
          float: left;
          padding-right: 3pt;
          padding-bottom: 3pt;
        }

        .nametag:nth-child(2n + 1) {
          clear: left;
        }
      `}</style>
    </div>
  );
};

export default ApcNametags;
