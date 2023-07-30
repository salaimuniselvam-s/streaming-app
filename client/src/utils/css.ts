export const tailwindCssConstant = {
  button:
    "text-white   focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center",
  blueButton: function () {
    return this.button + " bg-blue-700 hover:bg-blue-800";
  },
  redButton: function () {
    return this.button + " bg-red-500 hover:bg-red-600";
  },
};
