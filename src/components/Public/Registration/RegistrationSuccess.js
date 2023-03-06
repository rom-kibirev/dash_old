import Section from "../../UI/Sections/Section";
import Page from "../../UI/Sections/Page";


const RegistrationSuccess = (props) => {

    return (
        <Page>
            <Section>
                <p>На адрес официальной эл. почты отпралено письмо для подтверждения эл. почты</p>
                <p className="text-gray-500 text-sm italic"><a href="/create-password?new-user">переход по ссылке из письма</a></p>
            </Section>
        </Page>
    );
}

export default RegistrationSuccess;