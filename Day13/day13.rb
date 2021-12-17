require 'pry'

class Day13
  attr_accessor :sheet, :instructions

  def initialize
    @sheet = []
    @instructions = []
  end

  def run_part_1(test_file = false )
    read_file(test_file)
    puts instructions
    instructions.each_with_index do |instruction, idx|
      split_up = instruction.split('=')
      axis = split_up[0]
      fold_point = split_up[1].to_i
      if (axis == 'y')
        print_horizontal_fold(fold_point)
        horizontal_fold(fold_point)
      else
        print_vertical_fold(fold_point)
        vertical_fold(fold_point)

      end
      puts
    end
    print_sheet
    puts count_hashtags
  end

  private

  def count_hashtags
    count = 0
    sheet.each do |line|
      line.each do |point|
        count = count + 1 if point == '#'
      end
    end
    count
  end

  def vertical_fold(fold_point)
    should_fold_left = fold_point >= (sheet[0].length/2)
    sheet.each_with_index do |line, line_idx|
      line.each_with_index do |point, point_idx|
        distance_from_fold_point = (point_idx - fold_point).abs
        next if fold_point == point_idx 

        if should_fold_left
          next if fold_point > point_idx
          if point == '#'
            sheet[line_idx][fold_point - distance_from_fold_point] = '#'
          end
        else
          next if fold_point < point_idx 
          if point == '#'
            sheet[line_idx][fold_point + distance_from_fold_point] = '#'
          end
        end
      end
    end


    new_sheet = []

    if should_fold_left
      sheet.each do |line|
        line.slice!(fold_point, line.length)
      end
    else
      sheet.each do |line|
        line.slice!(0, fold_point)
      end
    end

    sheet = new_sheet
    
  end

  def horizontal_fold(fold_point)
    should_fold_up = fold_point >= (sheet.length/2)

    sheet.each_with_index do |line, line_idx|
      distance_from_fold_point = (line_idx - fold_point).abs
      next if line_idx == fold_point

      if should_fold_up
        next if line_idx < fold_point
        line.each_with_index do |point, point_idx|
          if point == '#'
            sheet[fold_point - distance_from_fold_point][point_idx] = '#'
          end
        end
      else
        next if line_idx > fold_point
        line.each_with_index do |point, point_idx|
          if point == '#'
            sheet[fold_point + distance_from_fold_point][point_idx] = '#'
          end
        end
      end
    end

    if should_fold_up
      sheet.slice!(fold_point, sheet.length)
    else
      sheet.slice!(0, fold_point + 1)
    end
  end


  # HELPERS

  def print_sheet
    sheet.each do |line|
      puts line.join('')
    end
  end

  def print_horizontal_fold(fold_point)
    sheet.each_with_index do |line, index|
      if index == fold_point
        str = ''
        line.length.times do
          str = str + '-'
        end
        puts str
      else
        puts line.join('')
      end
    end
  end

  def print_vertical_fold(fold_point)
    str = ''
    sheet.each do |line|
      line.each_with_index do |point, index|
        if index == fold_point
          str = str + '|'
        else
          str = str + point
        end
      end
      puts str
      str = ''
    end
  end

  def read_file(test_file = false)
    file_path = test_file ? 'testinput.txt' : 'input.txt'
    file = File.open(file_path)
    reading_instructions = false
    max_x = 0;
    max_y = 0;

    file.readlines.each do |line|
      if reading_instructions
        instructions.push(line.split(' ').last)
      else
        if line.chomp == ''
          reading_instructions = true  
        else 
          coordinates = line.split(',').map(&:to_i)
          max_x = coordinates[0] if coordinates[0] > max_x
          max_y = coordinates[1] if coordinates[1] > max_y
        end
      end
    end

    (max_y + 1).times do 
      sheet.push([])
    end

    sheet.each do |empty_array|
      (max_x + 1).times do
        empty_array.push('.')
      end
    end

    file = File.open(file_path)
    file.readlines.each do |line|
      if line.chomp == ''
        break
      else
        coordinates = line.split(',').map(&:to_i)
        sheet[coordinates[1]][coordinates[0]]  = '#'
      end
    end
  end
end

Day13.new.run_part_1(false)