import { Liveblocks } from "@liveblocks/node";

const key = process.env.LIVEBLOCKS_PRIVATE_KEY;

if(!key) {
  throw new Error(
    "LIVEBLOCKS_PRIVATE_KEY is not defined. Please set it in your environment variables."
  );
}

const liveblocks = new Liveblocks({
    secret: key,
});

export default liveblocks;