def day2
  depth_units = 0 
  horizontal_units = 0
  aim = 0
  file = File.open("input.txt")
  array = file.readlines.map(&:chomp)

  array.each do |string|
    split = string.split(' ')
    units = split[1].to_i
    if split[0] == 'up'
      aim = aim - units
    elsif split[0] == 'down'
      aim = aim + units
    elsif
      horizontal_units = horizontal_units + units
      depth_units = (units * aim) + depth_units
    end
  end

  total = depth_units * horizontal_units
  puts total
end

day2