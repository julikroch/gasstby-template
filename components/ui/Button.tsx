import styled from "@emotion/styled";

interface Button {
    bgColor?: boolean;
    textColor?: boolean;
}

const Button = styled.a`
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin-right: 1rem;
    background-color: ${(props: Button) => props.bgColor ? '#DA552F' : '#fff'};
    color: ${(props: Button) => props.textColor ? '#fff' : '#000'};

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;

export default Button