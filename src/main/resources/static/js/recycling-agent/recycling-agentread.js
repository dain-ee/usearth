// 상세보기 및 댓글, 함께 읽는 글
// 웹브라우저에서 현재 페이지의 전체 URL을 가져옴 즉, 현재 웹 페이지의 URL에서 마지막 세그먼트나 경로 이름을 가져옴
// split('/') : 문자열 메소드인 split을 사용하여 URL을 '/' 문자를 기준으로 나눔
// .pop() : 배열 메소드인 pop을 사용하여 배열의 마지막 요소를 가져옴
const postId = window.location.href.split('/').pop();

const postReadService = (function (){
    async function getPostDetail() {
        // postId를 사용하여 서버에서 해당 게시물의 정보를 가져옴
        const response = await fetch(`/recycling-reads/api/read/${postId}`);
        const json = await response.json();
        console.log(json);

        const mainPost = json.mainPost;
        await appendPost(mainPost);

        const randomFreePosts = json.randomFreePosts;
        await appendRandomFreePosts(randomFreePosts);
    }

    async function getComment() {
        const response = await fetch(`/recycling-reads/api/comment/${postId}`);
        const json = await response.json();
        console.log(json);

        document.querySelector(".commentTypography").textContent = json.commentCount;
        document.querySelector(".boxComment").innerHTML = '';

        const postComments = json.postComments;
        postComments.forEach((postComment) => {
            const div = document.createElement('div');
            document.querySelector(".boxComment").appendChild(div);
            appendComments(div, postComment);
        })

    }

    async function writeComment(commentContent){
        const data = {
            postId: postId,
            commentContent: commentContent
        }

        const respont = await fetch(`/recycling-reads/api/setComment`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (respont.ok){
            await getComment();
        }else{
            console.error('업데이트 실패');
        }

    }

    return {detail: getPostDetail, comment: getComment, writeComment: writeComment}
})();

postReadService.detail();
postReadService.comment();
// 전달 받은 매개변수 json을 사용하여 상세보기 HTML을 만들어주는 함수
const postedBox= document.querySelector(".postedBox");
function appendPost(mainPost) {
    console.log(mainPost);

    // 이 자리에 src 자리에 들어갈 꺼 만들어 부시면 됩니다.
    document.querySelector(".userInfomationName").textContent = `${mainPost.userName}`;
    document.querySelector(".aptBuildingNumber").textContent = `${mainPost.userDong}동 ${mainPost.userHo}호`;
    document.querySelector(".headlineTitle").textContent = `${mainPost.postTitle}`;
    document.querySelector(".purifiedHtml").textContent = `${mainPost.postContent}`;
    document.querySelector(".contentDate").textContent = `${mainPost.postModifyDate = mainPost.postWriteDate ? mainPost.postWriteDate.split(' ')[0] : mainPost.postModifyDate.split(' ')[0]}`;
    document.querySelector("#postViewCount").textContent = `${mainPost.postViewCount}`;
    document.querySelector("#likeCount").textContent = `${mainPost.likeCount}`;
}

function appendRandomFreePosts(randomFreePosts){
    // List타입을 반복해서 값을 가져오되 인덱스 번호도 함께 가져와서 활용
    randomFreePosts.forEach((randomFreePost, i) => {
        document.querySelector(`#postListTitleLine${i+1}`).textContent = `${randomFreePost.postTitle}`;
        document.querySelector(`#contentWrapper${i+1}`).textContent = `${randomFreePost.postContent}`;
        console.log(randomFreePost);
        console.log(i);
    })

}

// 제목 및 내용 수정하기
document.getElementById("modifyPostButton").addEventListener("click", function() {
    window.location.href = `/recycling-agent/recycling-agentwrite/${postId}`;
});

// 댓글 목록 생성
function appendComments(div, postComment) {
    div.innerHTML = `
        <div class="betweenJust">
            <div class="commentUserInformation normal">
                <div class="avatarWrapper">
                    <div>
                        <div class="commentAvatar container">
                            <img class="avatarComment nickName1" th:src="@{${postComment.userProfileName != null ? '/file/display?fileName=?' + postComment.userProfilePath + '/t_' + postComment.userProfileName : postComment.userKakaoProfileUrl}}" style="background: rgb(145, 207, 211);"></img>
                        </div>
                    </div>
                </div>
                <div class="informationWrapper">
                    <div class="nameCompanyWrapper">
                        <div class="nameIconWrapper">
                            <div class="nameWrapper">
                                <div class="infomationUserName bodyComment commentBody" style="color: inherit; font-weight: 600;">${postComment.userName}</div>
                            </div>
                            <div class="userInfoWrapper"></div>
                        </div>
                    </div>
                    <div class="otherWrapper">
                        <div class="commentTypography c-caption1" type="normal" style="color: rgb(173, 179, 184);">${postComment.commentWriteDate}</div>
                    </div>
                </div>
            </div>
            <div class="commentDrawer contentActionDropdownBottomSheet"></div>
        </div>
        <div class="commentTypography commentBody1" style="color: rgb(60, 65, 68); margin-bottom: 20px">
            <span class="purifiedHtml">${postComment.commentContent}</span>
        </div>
    `
}

document.querySelector(".buttonMedium").addEventListener("click", () => {
    let commentContent = document.querySelector(".inputFieldOutline");
    postReadService.writeComment(commentContent.value);
    commentContent.value = "";
})
document.querySelector(".arrowBackButton").addEventListener("click", () => {
    window.history.back();
})

function modifyButtonStatus() {
    if (post.userId === user.id) {
        console.log("같음")
        document.querySelector(".buttonIconMedium").style.display = 'flex';
    }else{
        console.log("다름")
        document.querySelector(".buttonIconMedium").style.display = 'none';
    }
}

modifyButtonStatus();