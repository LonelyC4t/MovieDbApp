import { Pagination } from 'antd';
import './footer.css';

const Footer = ({ totalPages, changePage, page }) => {
  const onClick = (e) => {
    if (e.target.closest('li').classList[0] === 'ant-pagination-item') {
      changePage(Number(e.target.textContent));
    } else if (e.target.closest('li').classList[0] === 'ant-pagination-next') {
      changePage('increment');
    } else if (e.target.closest('li').classList[0] === 'ant-pagination-prev') {
      changePage('decrement');
    }
  };
  return (
    <footer className="footer">
      <div onClick={onClick}>
        <Pagination simple={false} current={page} total={totalPages * 10} />
      </div>
    </footer>
  );
};
export default Footer;
