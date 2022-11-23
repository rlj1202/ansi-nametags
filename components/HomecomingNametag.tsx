import Image from "next/image";
import { FC } from "react";

import ansiLogo from "../public/ansi-logo-white.svg";

const HomecomingNametag: FC<{
  group: string;
  title: string;
  subtitle: string;
  homecomingYear: number;
  ext?: string;
}> = ({ group, title, subtitle, homecomingYear, ext }) => {
  const width = "8.3cm";
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
          background-color: white;
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
              ? "--ansi-cyan"
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

export default HomecomingNametag;
