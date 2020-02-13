import Config from '@config';
import IRequestBody from '@interfaces/IRequestBody';
import HttpService from './HttpService';

export default class PostService {
	public static fetchPosts() {
		const requestBody: IRequestBody = {
			query: `
				query {
					posts {
						_id
						title
						text
						created
						updated
						creator {
							_id
							username
						}
					}
				}
			`
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options).then(
			({ data: { posts } }) => {
				if (posts) {
					return posts;
				} else {
					const error: Array<Error> = [
						new Error('There are no posts')
					];
					throw error;
				}
			}
		);
	}

	public static createPost(token: string, title: string, text: string) {
		const requestBody: IRequestBody = {
			query: `
				mutation CreatePost($title: String!, $text: String!) {
					createPost(title: $title, text: $text) {
						_id
						title
						text
						created
						updated
						creator {
							_id
							username
						}
					}
				}
			`,
			variables: { title, text }
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { createPost } }) => {
				if (createPost) {
					return createPost;
				} else {
					const error: Array<Error> = [
						new Error('Failed to create post')
					];
					throw error;
				}
			}
		);
	}

	public static editPost(
		token: string,
		postId: string,
		title: string,
		text: string
	) {
		const requestBody: IRequestBody = {
			query: `
				mutation EditPost($postId:ID!, $title: String!, $text: String!) {
					editPost(editPostInput: { postId: $postId, title: $title, text: $text}) {
						_id
						title
						text
						created
						updated
						creator {
							_id
							username
						}
					}
				}
			`,
			variables: { postId, title, text }
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { editPost } }) => {
				if (editPost) {
					return editPost;
				} else {
					const error: Array<Error> = [
						new Error('Failed to edit post')
					];
					throw error;
				}
			}
		);
	}

	public static deletePost(token: string, postId: string) {
		const requestBody: IRequestBody = {
			query: `
				mutation DeletePost($postId: ID!) {
					deletePost(postId: $postId)
				}
			`,
			variables: { postId }
		};

		const options = {
			body: JSON.stringify(requestBody)
		};

		return HttpService.postJSON(Config.graphqlPath, options, token).then(
			({ data: { deletePost } }) => {
				if (deletePost) {
					return true;
				} else {
					const error: Array<Error> = [
						new Error('Failed to delete post')
					];
					throw error;
				}
			}
		);
	}
}
