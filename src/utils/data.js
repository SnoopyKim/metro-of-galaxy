// resources/testData.js 참고
import testData from './../resources/testData';

const days = ['일', '월', '화', '수', '목', '금', '토', '일']

export async function getStations() {
    try {
        const response = await fetch('http://nonge.iptime.org:8841/andmlalgkswnth/mog_api/get_stations')
        if (response.status === 200) {
            console.log("서버 호출 성공")
            return await response.json()
        } else {
            console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
            return testData.stations
        }
    } catch {
        console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
        return testData.stations
    }
}

export async function getStationInfo(station_name) {
    try {
        const now = new Date()
        const date = now.getFullYear().toString() + now.getMonth().toString()
        const day = days[now.getDay()]
        const time = now.getHours()

        const response = await fetch('http://nonge.iptime.org:8841/andmlalgkswnth/mog_api/get_station_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                date,
                day: day,
                station_name,
                time
            }
        })
        if (response.status === 200) {
            console.log("서버 호출 성공")
            return await response.json()
        } else {
            console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
            return testData.stationInfo
        }
    } catch {
        console.log("서버 오류로 인해 테스트 데이터를 가져옵니다")
        return testData.stationInfo
    }
}

export function getLines(data) {
    return data?.map(v => v.line)
}

export function selectStationInfo(data, line) {
    return data?.find(v => v.line === line.toString())
}