function rot13(a)
	{
	return a.replace(/[A-Za-z]/g,function(c)
		{
		return String.fromCharCode((((c=c.charCodeAt(0))&223)-52)%26+(c&32)+65)
	}
	)
}
