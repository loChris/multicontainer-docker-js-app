import keys from './keys';
import redis from 'redis';

const redisClient = redis.createClien({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

const fib = (index) => {
	if (index < 2) return 1;
	return fib(index - 1) + fib(index - 2);
};

sub.on('message', (channel, message) => {
	redisClient.hset('values', message, fin(parseInt(message)));
});

sub.subscribe('inserts');
