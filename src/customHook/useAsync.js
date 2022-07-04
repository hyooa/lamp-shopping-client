import { useReducer, useEffect } from "react";

// 상태 관리할 초기값
const initialState = {
    loading : false,
    data : null,
    error : null
}

// 3가지 타입(경우) : 로딩중 ?, 데이터 받기 성공, 데이터 받기 실패
// LOADING, SUCCESS, ERROR
function reducer (state, action) {
    switch (action.type) { // 경우의 수 정하기
        case "LOADING" :
        return {
            loading : true,
            date : null,
            error : null
        }

        case "SUCCESS" :
        return {
            loading : false,
            data : action.data,
            error : null
        }

        case "ERROR" :
        return {
            loading : false,
            data : null,
            error : action.error
        }

        default :
        return state;

    }
}

// dispatch 시 reducer 실행됨
                // callback 받아오기
function useAsync( callback, deps =[] ) {   // 함수, 초기값
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const fetchDate = async () => { // 마운드(?) 될 때 요청하고싶다.
        // fetchDate 호출시 요청하기
        dispatch({type : "LOADING"});
        try {
            const data = await callback(); // await은 callback() 실행 기다렸다가 값 담아주고 다른거 실행
            dispatch ({
                type : "SUCCESS",
                data : data
            })
        }
        catch (e) {
            dispatch({type : "ERROR", error : e})
        }
    }
    // 마운드(?) 될 때 요청하고싶다.
    useEffect(() => {
        fetchDate();
        // eslint-disable-next-line
    }, deps)
    // 실행되면 결과값 리턴
    return [state, fetchDate]; // loading data error가 담기 객체가 리턴 됨
}
export default useAsync; // 내보내기