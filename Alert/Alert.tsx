import { ToastAndroid } from "react-native";
function TostAlert() {

    const alertCenter = ({ message }: { message: string }) => {
        // This is a Botton position alert which Sort Duration.
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }
    const alertTop = ({ message }: { message: string }) => {
        // This is a top position alert which Long Duration.
        ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            200,
            50,
        );
    }


    return { alertCenter, alertTop }

}

export default TostAlert