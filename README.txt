・tableのtheadを固定するjQueryぷらぎんだよ
・tableを何らかの要素で包んで、包み要素に対してメソッドを実行してね
・包み要素に高さ指定するか、メソッドの引数に高さの数値（px）を渡して
・theadの高さ取得が甘いけど、tableのborderは闇だから許して

<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
<script src="jquery-fixed-head-table.js"></script>
<script>
$(function(){
	$('.fixed-head-table').fixedHeadTable(300);
});
</script>


<div class="fixed-head-table">
	<table>
		<thead>
			<tr>
				<th>head1</th><th>head2</th><th>head3</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
			<tr>
				<td>col1</td><td>col2</td><td>col3</td>
			</tr>
		</tbody>
	</table>
</div>