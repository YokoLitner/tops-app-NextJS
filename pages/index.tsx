import { GetStaticProps } from "next";
import React, { useState } from "react";
import { Htag, Button, P, Tag, Rating } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";

function Home({ menu }: HomeProps): JSX.Element {
    const [reting, setRating] = useState<number>(4);

    return (
        <div>
            <Htag tag="h1">Some Text</Htag>
            <Button appearance="primary" arrow="down">
                Button 1
            </Button>
            <Button appearance="ghost" arrow="right">
                Button 2
            </Button>
            <P textSize="l">Some Text !</P>
            <Tag textSize="s" color="red" href="/">
                Wow, that`s my Tag !
            </Tag>
            <Rating
                rating={reting}
                isEditable={true}
                setRating={setRating}
            ></Rating>

            <ul>
                {menu.map((m) => (
                    <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
                ))}
            </ul>
        </div>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(
        `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
        {
            firstCategory,
        }
    );
    return {
        props: {
            menu,
            firstCategory,
        },
    };
};

interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: number;
}
