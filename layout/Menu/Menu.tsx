import { useContext } from "react";
import { AppContext } from "../../context/app.contex";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { TopLevelCategory } from "../../interfaces/page.interface";
import Link from "next/link";
import icons from "./icons/icons";
import styles from "./Menu.module.css";
import cn from "classnames";
import { useRouter } from 'next/router';

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
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map((m) => {
            if(m._id.secondCategory == secondCategory){
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div
                                    className={cn(styles.firstLevel, {
                                        [styles.firstLevelActive]:
                                            m.id == firstCategory,
                                    })}
                                >
                                    <span className={styles.icon}>
                                        {m.icon}
                                    </span>
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => {
                    if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])){
                        m.isOpened = true;
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles.secondLevel} onClick={() => openSecondLevel(m._id.secondCategory)}>
                                {m._id.secondCategory}
                            </div>
                            <div
                                className={cn(styles.secondLevelBlock, {
                                    [styles.secondLevelBlockOpened]: m.isOpened,
                                })}
                            >
                                {buildThirdLevel(m.pages, menuItem.route)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return pages.map((p) => (
            <Link href={`/${route}/${p.alias}`}>
                <a
                    className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
                    })}
                >
                    {p.category}
                </a>
            </Link>
        ));
    };

    return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
