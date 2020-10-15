import axios from 'axios';
import { useEffect } from 'react';

const index = ({ data }) => {
	return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export const getServerSideProps = async (ctx) => {
	const dev = process.env.NODE_ENV !== 'production';
	const server = dev ? 'http://localhost:3000' : 'https://redis-in-cloud.vercel.app';
	const res = await axios(`${server}/api?name=Aman`);

	return {
		props: {
			data: res.data.data,
		},
	};
};

export default index;
