namespace BooksApi.Error
{
    public class ServerException
    {
        public ServerException(int errCode, string errMessage = null, string details = null)
        {
            ErrCode = errCode;
            ErrMessage = errMessage;
            Details = details;
        }

        public int ErrCode { get; set; }
        public string ErrMessage { get; set; }
        public string Details { get; set; }
    }
}