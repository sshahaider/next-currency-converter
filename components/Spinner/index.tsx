import styles from './styles.module.css'

interface Props {
    invert?: boolean
    active: boolean
    size?: "sm" | "md" | "lg"
}

const Spinner = ({ invert, size, active }: Props) => {

    let sizeClass: string;

    switch (size) {
        case "sm":
            sizeClass = "h-5 w-5"
            break;
        case "md":
            sizeClass = "h-7 w-7"
            break;
        case "lg":
            sizeClass = "h-9 w-9"
            break;
        default:
            sizeClass = "h-6 w-6"
            break;
    }

    const dot = `${styles.dot} ${invert ? "after:bg-primary" : "after:bg-background"} after:rounded-full after:content-['']`;
    if (active) {
        return <div className={`${styles.spinner} ${sizeClass} relative`}>
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
        </div>
    } else return;
}

export default Spinner;
