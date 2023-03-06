import Section from "../../UI/Sections/Section";
import PageSection from "../../UI/Sections/PageSection";


const RegistrationSuccess = (props) => {

    return (
        <PageSection>
            <Section>
                <p>На адрес официальной эл. почты отпралено письмо для подтверждения эл. почты</p>
                <p className="text-gray-500 text-sm italic"><a href="/create-password?new-user">переход по ссылке из письма</a></p>
            </Section>
        </PageSection>
    );
}

export default RegistrationSuccess;