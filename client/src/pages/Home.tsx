import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      여기가 홈 입니다 !!!
      <div>
        <Link to={'product'}> 이걸 누르면 상품페이지로 이동</Link>
      </div>
    </div>
  );
};
