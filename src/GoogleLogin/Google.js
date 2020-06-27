/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { isLoggedIn, getUserProfile, getAvatar } from '../selectors';

const GOOGLE_BUTTON_ID = 'google-sign-in-button';
let googleLoaded = false;

const GoogleParent = ({ loggedIn, userProfile, signIn, signOut, avatar }) => {
    const performSignout = () => {
        if (googleLoaded) {
            googleLoaded = false;
            window.gapi.auth2.getAuthInstance().signOut();
            signOut();
        }
    };

    return <div>
        {
            (isLoggedIn && googleLoaded) ?
                <img onClick={performSignout} src={avatar} />
                :
                <Google loggedIn={loggedIn} signIn={signIn} profile={userProfile} />
        }
    </div>;
};

function parseUserProfile(googleUser) {
    const basicProf = googleUser.getBasicProfile();
    const profile = {
        IdNum: basicProf.getId(),
        fullName: basicProf.getName(),
        firstName: basicProf.getGivenName(),
        lastName: basicProf.getFamilyName(),
        avatar: basicProf.getImageUrl(),
        email: basicProf.getEmail(),
    };

    return profile;
}

class Google extends React.Component {
    componentDidMount() {
        // do not rerender if logged in
        if (this.props.isLoggedIn) {
            return;
        }
        window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
            width: 200,
            height: 50,
            onsuccess: (googleUser) => {
                googleLoaded = true;
                this.props.signIn(parseUserProfile(googleUser));
            }
        });
    }

    render() {
        return <div id={GOOGLE_BUTTON_ID} />;
    }
}

const mapStateToProps = (state) => ({
    loggedIn: isLoggedIn(state),
    userProfile: getUserProfile(state),
    avatar: getAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
    signIn: (profile) => dispatch(signIn(profile)),
    signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleParent);