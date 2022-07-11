import machine
import matrix32x12


i2c_extend = machine.SoftI2C(scl = machine.Pin(4), sda = machine.Pin(5), freq = 400000)
matrix = matrix32x12.Matrix(i2c_extend)
matrix.set_buffer(matrix32x12.Matrix.HAPPY)
