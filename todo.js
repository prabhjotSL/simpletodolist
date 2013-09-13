function TodoCtrl($scope){
	
	$scope.todos = amplify.store("simpletodos") || [];	

	$scope.getTotalTodos = function(){
		return $scope.todos.length;
	}

	$scope.getRemainingTodos = function(){
		$scope.remaining = 0;
		_.filter($scope.todos, function(todo){
			if(!todo.done)
				$scope.remaining++;
		});
		return $scope.remaining;
	};

	$scope.saveTodos = function(){
		amplify.store("simpletodos",$scope.todos);
	};

	$scope.generateID = function(){
		date = new Date();
		ID = date.getTime();
		return ID;
	}

	$scope.addTodo = function(){
		if(! $scope.formTodoText == ""){
			$scope.todos.push({ID: $scope.generateID(), text: $scope.formTodoText, done: false});
			$scope.saveTodos();
			$scope.formTodoText = "";
		}
	};

	$scope.changedTodoStatus = function(){
		$scope.saveTodos();
	};

	$scope.removeItem = function(todo){
		$scope.todos = _.filter($scope.todos, function(item){
			return todo.ID != item.ID;
		});
		$scope.saveTodos();
	};

	$scope.clearCompleted = function(){
		$scope.todos = _.filter($scope.todos, function(todo){
			return !todo.done;
		});
		$scope.saveTodos();
	};
}