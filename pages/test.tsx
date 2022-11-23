import HomecomingNametag from "../components/HomecomingNametag";

const Test = () => {
  return (
    <>
      <HomecomingNametag
        group="교수님"
        title="홍길동"
        subtitle="교수님"
        homecomingYear={2022}
      />

      <HomecomingNametag
        group="졸업생"
        title="홍길동"
        subtitle="00학번"
        homecomingYear={2022}
      />

      <HomecomingNametag
        group="재학생"
        title="홍길동"
        subtitle="00학번"
        homecomingYear={2022}
      />

      <HomecomingNametag
        group="휴학생"
        title="홍길동"
        subtitle="00학번"
        homecomingYear={2022}
      />

      <HomecomingNametag
        group="신입생"
        title="홍길동"
        subtitle="00학번"
        homecomingYear={2022}
      />
    </>
  );
};

export default Test;
