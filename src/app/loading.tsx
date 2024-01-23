import { LOGO_IMAGE } from '@/constants/common'
import styles from './page.module.css'

function Loading({ page }: any) {

    console.log("loading page:", page)

    return (
        <main className={styles.loadingWrap}>
            {LOGO_IMAGE}
            <div className={styles.bgWrap}></div>
        </main>
    )
}

export default Loading