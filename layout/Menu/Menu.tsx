import { useContext } from "react";
import { AppContext } from "../../context/app.contex";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { TopLevelCategory } from "../../interfaces/page.interface";
import icons from "./icons/icons";
import styles from "./Menu.module.css";
import cn from "classnames";

const firstLevelMenu: FirstLevelMenuItem[] = [
    {
        route: "courses",
        name: "Courses",
        icon: <icons.CourseIcon />,
        id: TopLevelCategory.Courses,
    },
    {
        route: "products",
        name: "Products",
        icon: <icons.ProductIcon />,
        id: TopLevelCategory.Products,
    },
    {
        route: "services",
        name: "Services",
        icon: <icons.ServiceIcon />,
        id: TopLevelCategory.Services,
    },
    {
        route: "books",
        name: "Books",
        icon: <icons.BookIcon />,
        id: TopLevelCategory.Books,
    },
];

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.route}>
                        <a href={`/${m.route}`}>
                            <div
                                className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]:
                                        m.id == firstCategory,
                                })}
                            >
                                <span className={styles.icon}>{m.icon}</span>
                                <span>{m.name}</span>
                            </div>
                        </a>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>
                            {m._id.secondCategory}
                        </div>
                        <div
                            className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpen]: m.isOpened,
                            })}
                        >
                            {buildThirdLevel(m.pages, menuItem.route)}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return pages.map((p) => (
            <a
                href={`/${route}/${p.alias}`}
                className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: false,
                })}
            >
                {p.category}
            </a>
        ));
    };

    return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
