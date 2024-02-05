'use client'
import { LOGO_IMAGE } from '@/constants/common';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import styles from "./notfound.module.css";

function NotFound() {
    const router = useRouter()
    return (
        <div className={styles.pageWrap}>
            <div className={styles.logoWrap}>
                <Suspense fallback={<div>Loading</div>}>
                    <img src={LOGO_IMAGE} />
                </Suspense>
            </div>
            <div className={styles.hWrap}>
                <h1>404</h1>
                <div className={styles.after}>404</div>
            </div>
            <div className={styles.cloak__wrapper}>
                <div className={styles.cloak__container}>
                    <div className={styles.cloak} ></div>
                </div>
            </div>
            <div className={styles.info}>
                <h2>We can&apos;t find that page</h2>
                <Button size='large' type="primary" onClick={() => router.push('/')}>Go to dashboard</Button>
            </div>
            {/* <div className={styles.contentWrap}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => router.push(HOME_ROUTING)}>Go to dashboard</Button>}
                />
            </div> */}
        </div>
    )
}

export default NotFound