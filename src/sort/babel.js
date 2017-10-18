function babelSort(arr) {
    for (var i = 0; i < array.length; i++) {
        for (var j = i; j < array.length; j++) {
            var el = array[j];
            if (arr[j] < arr[j - 1]) {
                tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
            }
        }
    }
    return arr;
}

var array = [7, 10, 2, 9, 27, 4];

console.log(babelSort(array));