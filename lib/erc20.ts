import { Abi } from "starknet";

export const erc20ABI = [
  {
    "name": "RatingImpl",
    "type": "impl",
    "interface_name": "rocksratingcairo2::rating::Rating"
  },
  {
    "name": "rocksratingcairo2::rating::Rating",
    "type": "interface",
    "items": [
      {
        "name": "set_rating",
        "type": "function",
        "inputs": [
          {
            "name": "value",
            "type": "core::integer::u8"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "get_ratings",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<core::integer::u8>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "rocksratingcairo2::rating::rocksratings::Event",
    "type": "event",
    "variants": []
  }
] satisfies Abi;
