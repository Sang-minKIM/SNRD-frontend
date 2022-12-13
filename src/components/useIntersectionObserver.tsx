import { useScroll } from "framer-motion";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { activeState } from "../atom";

export function useIntersectionObservation(rootRef: any, targetRef: any) {
  const [active, setActive] = useRecoilState(activeState);
  const { scrollY } = useScroll({
    container: rootRef,
  });

  // scroll 방향 check function
  let direction = "";
  let prevYposition = 0;

  const checkScrollDirection = (prevY: number) => {
    scrollY.get() > prevY ? (direction = "down") : (direction = "up");

    prevYposition = scrollY.get();
  };

  useEffect(() => {
    const callback = (entries: any) => {
      // 각 entry는 가시성 변화가 감지될 때마다 발생하고 그 context를 나타냅니다.
      // target element:
      //   entry.boundingClientRect : target의 getBoundingClientRect() 메서드를 실행하면 나오는 값과 같은 정보를 반환
      //   entry.intersectionRatio : target과 root가 교차되는 부분의 수치로 반환 (0.0과 1.0의 사이)
      //   entry.intersectionRect : target과 root가 교차되는 정보를 반환
      //   entry.isIntersecting :  target과 root의 교차 상태를 true, false로 반환
      //   entry.rootBounds : options에서 지정한 root의 정보를 반환 (기본값 viewport)
      //   entry.target : 현재 객체의 target element 정보를 반환
      //   entry.time : target과 root의 교차가 일어난 시간을 반환
      entries.forEach((entry: any) => {
        // scroll 방향 체크
        checkScrollDirection(prevYposition);

        if (entry.isIntersecting) {
          setActive(entry.target.className.split(" ")[2] + "");
          console.log("active", entry.target);
          console.log("direction", direction);

          console.log("rootref", scrollY.get());
        }
      });
    };
    //intersection observer
    let options = {
      root: rootRef.current,
      threshold: direction === "down" ? 0 : 1,
    };

    // options에 따라 인스턴스 생성
    let observer = new IntersectionObserver(callback, options);
    // 타겟 요소 관찰 시작
    const targetList = targetRef.current;
    // 반복문을 돌려 모든 DOM에 적용
    targetList.forEach((element: any) => observer.observe(element));

    //3. 언 마운트시 옵저버 해제
    return () => observer.disconnect();
  }, [active]);
}
