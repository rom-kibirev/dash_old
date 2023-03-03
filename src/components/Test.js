import { useForm } from "react-hook-form";
import styles from "./test.module.css";
import Section from "./UI/Sections/Section";
import Grids from "./UI/Grids/Grids";


const Test = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = (data) => {
        console.log('\n ', data);
    };

    return (
        <Section>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grids cols={2}>
                    <div className={errors.name ? styles.invalid : ''}>
                        <label htmlFor="name">{errors.name ? 'Заполните поле name' : 'name'}</label>
                        <input
                            name="name"
                            type="text"
                            defaultValue=""
                            {...register("name", {
                                validate: (value) => value.length > 0
                            })}
                        />
                    </div>
                    <div className={errors.email ? styles.invalid : ''}>
                        <label htmlFor="email">{errors.email ? 'Заполните поле name' : 'email'}</label>
                        <input
                            name="email"
                            type="email"
                            defaultValue=""
                            {...register("email", {
                                validate: (value) => /\S+@\S+\.\S+/.test(value)
                            })}
                        />
                    </div>
                </Grids>
                <input type="submit" />
            </form>

            {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <label htmlFor="firstName">First Name</label>*/}
            {/*    <input*/}
            {/*        defaultValue={intialValues.firstName}*/}
            {/*        placeholder="bill"*/}
            {/*        {...register("firstName", {*/}
            {/*            validate: (value) => value !== "bill"*/}
            {/*        })}*/}
            {/*    />*/}
            {/*    {errors.firstName && <p>Your name is not bill</p>}*/}

            {/*    <label htmlFor="lastName">Last Name</label>*/}
            {/*    <input*/}
            {/*        defaultValue={intialValues.lastName}*/}
            {/*        placeholder="luo"*/}
            {/*        {...register("lastName", {*/}
            {/*            validate: (value) => value.length > 3*/}
            {/*        })}*/}
            {/*    />*/}
            {/*    {errors.lastName && <p>Your last name is less than 3 characters</p>}*/}

            {/*    <label htmlFor="email">Email</label>*/}
            {/*    <input*/}
            {/*        defaultValue={intialValues.email}*/}
            {/*        placeholder="bluebill1049@hotmail.com"*/}
            {/*        type="email"*/}
            {/*        {...register("email")}*/}
            {/*    />*/}
            {/*    <label htmlFor="age">Age</label>*/}
            {/*    <input*/}
            {/*        defaultValue={intialValues.age}*/}
            {/*        placeholder="0"*/}
            {/*        type="text"*/}
            {/*        {...register("age", {*/}
            {/*            validate: {*/}
            {/*                positiveNumber: (value) => parseFloat(value) > 0,*/}
            {/*                lessThanHundred: (value) => parseFloat(value) < 200*/}
            {/*            }*/}
            {/*        })}*/}
            {/*    />*/}
            {/*    {errors.age && errors.age.type === "positiveNumber" && (*/}
            {/*        <p>Your age is invalid</p>*/}
            {/*    )}*/}
            {/*    {errors.age && errors.age.type === "lessThanHundred" && (*/}
            {/*        <p>Your age should be greater than 200</p>*/}
            {/*    )}*/}

            {/*    <input type="submit" />*/}
            {/*</form>*/}
        </Section>

    );
}

export default Test;
