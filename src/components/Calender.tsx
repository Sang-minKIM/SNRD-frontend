import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, RangeKeyDict } from "react-date-range";
import { ko } from "date-fns/locale";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { dateState } from "../atom";

const Container = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 2px;
`;

const Submit = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: rgba(61, 145, 255, 1);
  color: #fff;
  &:hover {
    cursor: pointer;
    background-color: rgba(61, 145, 255, 0.8);
  }
`;

const DatePicker = styled(DateRange)`
  .rdrCalendarWrapper {
    box-sizing: border-box;
    background: #ffffff;
    display: inline-flex;
    flex-direction: column;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .rdrMonthAndYearWrapper {
    box-sizing: inherit;
    display: flex;
    justify-content: space-between;
  }

  .rdrMonthAndYearPickers {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .rdrMonthsVertical {
    flex-direction: column;
    align-items: center;
  }

  .rdrDateDisplay {
    display: none;
    justify-content: space-between;
  }
`;

export function Calender({ setCalender }: any) {
  const [date, setDate] = useRecoilState(dateState);
  const onClick = () => {
    setCalender(false);
    console.log(date);
  };
  return (
    <Container>
      <DatePicker
        onChange={(item: RangeKeyDict) => {
          console.log(item);
          return setDate([item.selection]);
        }}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={date}
        direction="vertical"
        preventSnapRefocus={true}
        calendarFocus="forwards"
        locale={ko}
        editableDateInputs={true}
      />
      <Submit type="button" onClick={onClick}>
        확인
      </Submit>
    </Container>
  );
}
