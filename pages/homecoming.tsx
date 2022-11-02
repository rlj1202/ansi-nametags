import { NextPage } from "next";
import Image from "next/image";
import { FC } from "react";

import ansiLogo from "../public/ansi-logo-white.svg";

const HomecomingNametag: FC<{
  name: string;
  group: string;
  admissionYear: number;
  homecomingYear: number;
  ext?: string;
}> = ({ name, group, admissionYear, homecomingYear, ext }) => {
  return (
    <div className="wrapper">
      <div className="info">
        <div className="info-year">{admissionYear}</div>
        <div className="info-name">{name}</div>
        <div className="info-ext">{ext || ""}</div>
      </div>
      <div className="footer">
        <div className="footer-logo">
          <Image src={ansiLogo} alt="A.N.S.I. Logo" fill />
        </div>
        <div className="footer-hangul">
          {homecomingYear} A.N.S.I. 홈커밍데이
        </div>
        <div className="footer-english">
          A.N.S.I. Homecoming Day {homecomingYear}
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          border-width: 1.5pt;
          border-color: black;
          border-style: solid;

          min-width: 10cm;
          max-width: 10cm;
          min-height: 9cm;
          max-height: 9cm;

          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        .info {
          color: black;
          font-weight: bold;
          text-align: center;

          flex-grow: 1;

          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 25pt 0;
        }
        .info-year {
          font-size: 36pt;
        }
        .info-name {
          font-size: 80pt;
        }
        .info-ext {
          font-size: 24pt;
        }

        .footer {
          text-align: right;
          background-color: red;
          color: white;

          padding: 5pt;
          box-sizing: border-box;

          display: grid;
          grid-template-columns: auto auto;
          grid-template-rows: auto auto;
        }
        .footer-logo {
          height: 15pt;

          position: relative;

          place-self: center;

          grid-row-start: 1;
          grid-row-end: span 2;
        }
        .footer-hangul,
        .footer-english {
          padding: 1pt;
          box-sizing: border-box;
        }
        .footer-hangul {
          font-weight: bold;
          font-size: 14pt;

          grid-column-start: 2;
        }
        .footer-english {
          font-size: 13pt;

          grid-column-start: 2;
        }
      `}</style>
    </div>
  );
};

const HomecomingNametags: NextPage = ({}) => {
  return (
    <>
      <HomecomingNametag
        name="심지수"
        group="재학생"
        admissionYear={18}
        homecomingYear={2022}
      />
    </>
  );
};

export default HomecomingNametags;
