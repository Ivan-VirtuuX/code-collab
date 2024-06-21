import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Страница не найдена",
  icons: {
    icon: "/favicons/not-found-page.svg",
  },
};

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-desc">Извините, эта страница не существует</p>
      <p className="not-found-info">
        Возможно, она была удалена, или вы ввели неправильный адрес. Проверьте
        правильность URL или воспользуйтесь меню навигации, чтобы найти нужную
        информацию
      </p>
    </div>
  );
};

export default NotFound;
