import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tag } from 'antd';
const useColumns = () => {
  const hrefId = useSelector((state) => state.user.userId);
  const hrefRepo = useSelector((state) => state.repository.name);
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (title, values) => {
        if (values.type === 'issue') {
          return (
            <Link to={`/${hrefId}/repositories/${hrefRepo}/issues/${values.key}`}>{title}</Link>
          );
        } else {
          return (
            <Link
              to={{
                pathname: `/${hrefId}/repositories/${hrefRepo}/requests/${values.key}`,
                state: { userId: hrefId, repositoryName: hrefRepo },
              }}
            >
              {title}
            </Link>
          );
        }
      },
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <span>
          {tags?.map((tag) => {
            let color;

            if (tag === 'QUESTION') {
              color = 'geekblue';
            } else if (tag === 'ISSUE') {
              color = 'volcano';
            } else if (tag === 'OK') {
              color = 'green';
            } else if (tag === 'DENIED') {
              color = 'red';
            } else if (tag === 'REQUEST') {
              color = 'processing';
            } else if (tag === 'MERGE') {
              color = 'gold';
            } else if (tag === 'DUPLICATE') {
              color = 'default';
            }
            return (
              <Tag color={color} key={tag}>
                {tag?.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
  return columns;
};

export default useColumns;
