import { TagProps } from './Tag.props';
import styles from './Tag.module.css';
import cn from 'classnames';


export const Tag = ({ textSize = 's', children, color = 'ghost', href, className, ...props }: TagProps): JSX.Element => {
    return (<>
        <div
            className={cn(
                styles.tag, className, {
                [styles.s]: textSize == 's',
                [styles.m]: textSize == 'm',
                [styles.ghost]: color == 'ghost',
                [styles.red]: color == 'red',
                [styles.green]: color == 'green',
                [styles.primary]: color == 'primary',
                [styles.gray]: color == 'gray',
            }
            )}
            {...props}
        >
                {
                href
                    ? <a href={href}>{children}</a>
                    : <>{children}</>
            }
        </div>
    </>);
};