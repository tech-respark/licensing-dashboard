import ResetPasswordPage from '@/components/templates/resetPasswordPage';
import { getUserById } from '@/lib/internalApi/user';
import React from 'react';

async function page({ params }: any) {
    const userid = params.userId;
    let userDetails: any = { email: "" }
    if (userid) {
        userDetails = await getUserById(userid);
        userDetails = userDetails.data;
    }
    return <React.Fragment>
        <ResetPasswordPage userDetails={userDetails} />
    </React.Fragment>
}

export default page