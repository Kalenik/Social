import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import HttpService from './HttpService';

export default class LikedPostService {
	public static likePost(token: string, postId: string) {
		const requestBody: IRequestBody = {
			query: `
				mutation LikePost($postId: ID!) {
					likePost(postId: $postId) {
						_id
						post {
							title
						}
					}
				}
			`,
			variables: {
				postId
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { likePost } }) => {
				if (likePost) {
					return likePost;
				} else {
					const error: Array<Error> = [
						new Error('Failed to like post')
					];
					throw error;
				}
			}
		);
	}

	public static fetchLikedPosts(token: string) {
		const requestBody: IRequestBody = {
			query: `
				query {
					likedPosts {
						_id
						created
						post {
							title
							text
							created
							updated
							creator {
								username
							}
						}
					}
				}
			`
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { likedPosts } }) => {
				if (likedPosts && likedPosts.length > 0) {
					return likedPosts;
				} else {
					const error: Array<Error> = [
						new Error('There are no liked posts')
					];
					throw error;
				}
			}
		);
	}

	public static deleteLikedPost(token: string, likedPostId: string) {
		const requestBody: IRequestBody = {
			query: `
				mutation DeleteLikedPost($likedPostId: ID!) {
					deleteLikedPost(likedPostId: $likedPostId) {
						title
					}
				}
			`,
			variables: {
				likedPostId
			}
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { deleteLikedPost } }) => {
				if (deleteLikedPost) {
					return deleteLikedPost;
				} else {
					const error: Array<Error> = [
						new Error('Failed to delete liked post')
					];
					throw error;
				}
			}
		);
	}
}
