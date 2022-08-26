import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { withLayout } from "../../layout/Layout";
import axios from "axios";
import { MenuItem } from "../../interfaces/menu.interface";
import { TopPageModel } from "../../interfaces/page.interface";
import { ParsedUrlQuery } from "querystring";
import { ProductModel } from "../../interfaces/product.interface";
const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
    return <>{products.lenght}</>;
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await instance.post<MenuItem[]>(
        "/api/top-page/find",
        { firstCategory }
    );

    return {
        paths: menu.flatMap((m) => m.pages.map((p) => `/courses/${p.alias}`)),
        fallback: true,
    };
};

const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}`,
});

export const getStaticProps: GetStaticProps<CourseProps> = async ({
    params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true,
        };
    }

    const { data: menu } = await instance.post<MenuItem[]>(
        "/api/top-page/find",
        { firstCategory }
    );

    const { data: page } = await instance.get<TopPageModel>(
        `/api/top-page/byAlias/${params.alias}`
    );

    const { data: products } = await instance.post<ProductModel>(
        "/api/product/find",
        {
            category: page.category,
            limit: 10,
        }
    );

    return {
        props: {
            menu,
            firstCategory,
            page,
            products,
        },
    };
};

interface CourseProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
    page: TopPageModel;
    products: ProductModel;
}
