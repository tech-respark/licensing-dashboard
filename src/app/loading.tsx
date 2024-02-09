import Style from '../components/organisms/loader/loader.module.scss';
import styles from './page.module.css';

function Loading({ page }: any) {

    return (
        <main className={styles.loadingWrap}>
            <div className={styles.logoWrap}>
                <div className={Style.loaderbody}>
                    <div className={Style.spinner}>
                        <div className={Style.bounce1}></div>
                        <div className={Style.bounce2}></div>
                        <div className={Style.bounce3}></div>
                    </div>
                </div>
            </div>
            <div className={styles.bgWrap}></div>
        </main>
    )
}

export default Loading