/* 
    params1:Url
    params2:pageNo
    params3:pageSize
*/
import getLocalTime from './formatTime'
async function changePage(url, pageNo, pageSize) {
    let commentList = await this.$request.get(
        `/comment?pageNo=${pageNo}&pageSize=${pageSize}`
    );
    commentList = commentList.data.data;
    if (commentList[0].ctime) {
        commentList = commentList.map((item) => {
            item.ctime = getLocalTime(item.ctime);
            return item;
        });
    }
    return commentList;
}
export default changePage