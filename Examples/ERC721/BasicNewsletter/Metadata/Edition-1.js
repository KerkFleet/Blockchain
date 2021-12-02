const metadata = {
  1: {
    description: "The first newsletter NFT.",
    image: "https://i.imgur.com/hMVRFoJ.jpeg",
    name: "First Newletter",
  };
    
export default function handler(req, res) {
  res.status(200).json(metadata[req.query.id] || {});
}
