import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Badge, Menu, Dropdown, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Api from '../../../util/Api';
import { deleteAllAlarm } from '../../../_actions/alram_action';
import { onClickAlarmAPI } from '../../../util/api/alarm';

function Alarm(props) {
  const dispatch = useDispatch();

  const alarms = useSelector((state) => state.alarm.navAlarm);

  const typemap = {
    LIKE: '지도를 좋아합니다.',
    CLONE: '지도를 가져갔습니다.',
    REQUEST: '지도에 변경 요청을 남겼습니다.',
    ISSUE: '지도를 지적했습니다.',
    REQUEST_DENIED: '변경요청을 거부했습니다.',
    REQUEST_ACCEPTED: '변경요청을 승인했습니다.',
    ISSUE_OK: '지적을 확인했습니다.',
  };

  const onClickAlarm = async (values) => {
    await onClickAlarmAPI(values.key);
  };

  let alarmCount = 0;

  const AlarmList = (
    <Menu>
      {alarms.length > 0 &&
        alarms.map((alarm, idx) => {
          if (alarm.read === false) {
            alarmCount += 1;
            return (
              <Menu.Item
                key={alarm.id}
                icon={
                  <Image
                    width="1.5rem"
                    height="1.5rem"
                    alt="example"
                    src={
                      alarm.thumbnail !== null
                        ? Api.defaults.baseURL + '/files/' + alarm.thumbnail
                        : 'no-image3.png'
                    }
                    style={{ borderRadius: '10%', marginTop: '5px' }}
                    preview={false}
                  />
                }
                title={alarm.spaceName}
                onClick={onClickAlarm}
              >
                <a
                  href={`/${props.user.userId}/repositories/${alarm.spaceName}`}
                  style={{ marginLeft: '8px' }}
                >
                  <text style={{ fontWeight: 'bold' }}>{alarm.srcMemberName}</text>
                  님이 회원님의 {typemap[alarm.alarmType]}
                </a>
              </Menu.Item>
            );
          }
        })}
      {alarmCount !== 0 && (
        <Menu.Item
          style={{ color: '#999999' }}
          onClick={() => {
            Api.post(`/${props.user.userId}/alarms`)
              .then((response) => {
                dispatch(deleteAllAlarm());
              })
              .catch((err) => err);
          }}
        >
          알람 모두 읽음으로 표시
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <AlarmContainer>
      <Badge count={alarmCount} size="small">
        <Dropdown overlay={AlarmList} trigger={['click']}>
          <BellOutlined style={{ fontSize: '1.5rem', marginTop: '0.1875rem' }} />
        </Dropdown>
      </Badge>
    </AlarmContainer>
  );
}

export default withRouter(Alarm);

const AlarmContainer = styled.div`
  border-radius: 1.1rem;
  background-color: white;
  width: 2.2rem;
  height: 2.2rem;
  margin-top: 1rem;
  text-align: center;
  vertical-align: middle;
  margin-right: 1.5rem;
`;
