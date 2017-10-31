/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    var setMap = {};
    var sets = [];
    for (var i = 0; i < nums.length; i ++) {
        var target = nums[i];
        var map = {};
        for(var j = i + 1; j < nums.length; j ++) {
            var number = - target - nums[j];
            if (map.hasOwnProperty(number)) {
                var array = [target, number, nums[j]].sort();
                var key = array.join('');
                if (!setMap.hasOwnProperty()) {
                    setMap[key] = array;
                }
            }
            if (!map.hasOwnProperty(nums[j])) {
                map[nums[j]] = j;
            }
        }
    }
    for (var key in setMap) {
        sets.push(setMap[key]);
    }
    console.log(sets);
    return sets;
};

threeSum([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]);
threeSum([0, 0, 0, 0]);


// var threeSum = function(nums) {
//     var sets = [];
//     for (var i = 0; i < nums.length; i ++) {
//         var target = - nums[i];
//         for(var j = 0; j < nums.length; j ++) {
//             var index = nums.indexOf(target - nums[j]);
//             if (~index && index > j > i) {
//                 console.log(index, j);
//                 sets.push([nums[j], nums[index], - target]);
//             }
//         }
//     }
//     console.log(sets);
//     return sets;
// };