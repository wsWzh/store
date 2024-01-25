import './error.css'

const ErrorPage = (props) => {
    const { message } = props

    return <div className='error'>
        <p>{message}</p>
    </div>
}

ErrorPage.defaultProps = {
    message: '服务异常'
}

export default ErrorPage;
