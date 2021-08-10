import { useSelector } from 'react-redux';

const useMyPageTab = () => {
  const typemap = {
    LIKE: '지도를 좋아합니다.',
    CLONE: '지도를 가져갔습니다.',
    REQUEST: '지도에 변경 요청을 남겼습니다.',
    ISSUE: '지도를 지적했습니다.',
    REQUEST_DENIED: '변경요청을 거부했습니다.',
    REQUEST_ACCEPTED: '변경요청을 승인했습니다.',
    ISSUE_OK: '지적을 확인했습니다.',
  };

  const mapList = useSelector((state) => state.userInfo.mapList);

  const cloneObj = (obj) => JSON.parse(JSON.stringify(obj));

  let mapListOrderByLike = cloneObj(mapList);
  mapListOrderByLike.sort((a, b) => {
    return b.likeCount - a.likeCount;
  });

  let mapListOrderByVisitCount = cloneObj(mapList);
  mapListOrderByVisitCount.sort((a, b) => {
    return b.visitCount - a.visitCount;
  });

  const chartData = (mapList, type) => {

    let filterdMapList = [];
    let data = null;
    let backgroundColor = [];
    
    if (type === 'like') {
      filterdMapList = mapList.filter((x) => {
        return x.likeCount !== 0;
      });
      data = filterdMapList.map((map) => {
        return map.likeCount;
      });
      backgroundColor = ['#CDDC39', '#fad0c3', '#bed3f3', '#FF6384', '#36A2EB'];
    } else {
      filterdMapList = mapList.filter((x) => {
        return x.visitCount !== 0;
      });
      data = filterdMapList.map((map) => {
        return map.visitCount;
      });

      backgroundColor = ['#FFCE56', '#81c784', '#FFA000', '#ba68c8', '#AEA1FF'];
    }
    let labels = filterdMapList.map((map) => {
      return map.name;
    });

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          label: '',
          backgroundColor: backgroundColor,
        },
      ],
    };
  };

  const likeChartData = chartData(mapListOrderByLike, 'like');
  const visitChartData = chartData(mapListOrderByVisitCount, 'visit');

  // sumOfMapLike, sumOfMapVisit, likeChartData, visitChartData
  return { typemap, mapList, likeChartData, visitChartData };
};

export default useMyPageTab;
