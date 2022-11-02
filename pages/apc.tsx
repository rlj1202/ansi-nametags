import { NextPage } from "next";
import { FC, useEffect, useRef } from "react";

const ApcNametag: FC<{
  name: string;
  department: string;
  role: string;
  year: number;
}> = ({ name, department, role, year }) => {
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roleRef.current) return;
    const fontSize = window
      .getComputedStyle(roleRef.current, null)
      .getPropertyValue("font-size");

    const fontSizeNum = parseInt(fontSize.match(/\d+/)?.at(0) || "1");

    const padding = 15;

    const width = roleRef.current.clientWidth;
    const parentWidth =
      (roleRef.current.parentElement?.clientWidth || 1) - padding * 2;

    roleRef.current.style.fontSize = `${(fontSizeNum / width) * parentWidth}px`;
  });

  return (
    <div className="wrapper">
      <div className="info">
        <div ref={roleRef} className="info-role">
          {role}
        </div>
        <div className="info-name">
          {department} {name}
        </div>
      </div>
      <div className="footer">
        <div className="footer-year">{year} APC</div>
        <div>제 12회 아주대학교 프로그래밍 경시대회</div>
      </div>
      <style jsx>{`
        .wrapper {
          width: 10cm;
          height: 9cm;

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
        .info-role {
          font-size: 45pt;
          font-weight: bold;
          ${role == "STAFF" ? "color: rgb(187, 39, 26)" : ""}
          ${role == "DIRECTOR" ? "color: rgb(36, 42, 52)" : ""}
          ${role == "SETTER" ? "color: rgb(107, 34, 70)" : ""}
          ${role == "SYSTEM" ? "color: rgb(38, 78, 90)" : ""}
        }
        .info-name {
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

const ApcNametags: NextPage = ({}) => {
  const year = 2022;

  const persons = [
    {
      name: "심지수",
      department: "소프트웨어학과",
      role: "DIRECTOR",
    },
    {
      name: "심지수",
      department: "소프트웨어학과",
      role: "SETTER",
    },
    {
      name: "정의찬",
      department: "소프트웨어학과",
      role: "SETTER",
    },
    {
      name: "송선우",
      department: "소프트웨어학과",
      role: "SETTER",
    },
    {
      name: "김현빈",
      department: "소프트웨어학과",
      role: "SETTER",
    },
    {
      name: "오상윤",
      department: "소프트웨어학과",
      role: "PROFESSOR",
    },
    {
      name: "홍길동",
      department: "소프트웨어학과",
      role: "SYSTEM",
    },
  ];

  return (
    <div className="wrapper">
      {persons.map((person) => {
        return (
          <ApcNametag
            name={person.name}
            department={person.department}
            role={person.role}
            year={year}
            key={`${person.name}${person.role}`}
          />
        );
      })}

      <style jsx>{`
        .wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 3pt;
        }
      `}</style>
    </div>
  );
};

export default ApcNametags;
