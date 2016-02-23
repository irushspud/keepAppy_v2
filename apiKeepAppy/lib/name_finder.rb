
def is_name(word, names)
	count = 0
	if(names.include? word.downcase)
		return true
	end
	
	return false
end

grab = File.open('~\keepAppy\names.txt').read
name_array = grab.split
#name_array.gsub!(/\r\n?/,"\n")

text = gets.chomp
input = text.split
count = 0
input.each do |word|
	if(is_name(word,name_array))
		word.replace("*******")
		count += 1
	end
	
end
puts input